const pool = require('../config/database');
const MySQLEvents = require('@rodrigogs/mysql-events')
const { calculateIn } = require('../upload/punchTableUpdation')

// console.log(MySQLEvents.STATEMENTS)

const program = async () => {

    // const connection = mysql.createConnection({
    //     host: process.env.DB_HOST,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASS,
    //     dateStrings: true
    // })


    const instance = new MySQLEvents(pool, {
        startAtEnd: true,
        excludedSchemas: {
            mysql: true,
        },
    })

    await instance.start();

    instance.addTrigger({
        name: 'TEST',
        expression: 'medi_hrm.punch_data',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: (event) => {
            // Only get the INSERT EVENT
            const obj = event.affectedRows[0].after;
            const objectLngth = Object.keys(obj).length;
            if (objectLngth > 0) {
                // console.log(obj)
                const { slno, id, emp_code, punch_time, punch_state } = obj;
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