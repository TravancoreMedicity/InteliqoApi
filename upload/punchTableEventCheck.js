const pool = require('../config/database');
const MySQLEvents = require('@rodrigogs/mysql-events')
const { calculateIn, punchInsert } = require('../upload/punchTableUpdation')


const program = async () => {

    const instance = new MySQLEvents(pool, {
        startAtEnd: true,
        excludedSchemas: {
            mysql: true,
        },
    })

    await instance.start();

    instance.addTrigger({
        name: 'TEST',
        expression: 'zkteco.iclock_transaction',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: (event) => {
            // Only get the INSERT EVENT
            const obj = event.affectedRows[0].after;
            const objectLngth = Object.keys(obj).length;
            if (objectLngth > 0) {
                // console.log(obj)
                const { slno, id, emp_code, punch_time, punch_state } = obj;
                punchInsert(id, emp_code, punch_time, punch_state)
                calculateIn(emp_code, punch_time)
            }
        },
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};


program()
    .then(() => console.log('Waiting for database events...'))
    .catch(console.error);