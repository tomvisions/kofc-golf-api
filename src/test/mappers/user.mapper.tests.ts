/*
import { resolve } from 'path';
import chai, { expect } from 'chai';
import spies from 'chai-spies';

chai.use(spies);
import rewire from 'rewire';

const {userMapper} = rewire("../../mapper/user.mapper.js");
console.log(userMapper);

//const UserMapper = UserMapperModule.__get__('Component')
//mport { logger } from '../../src/services';

describe('Mappers => UserMapper', () => {
    const sandbox = chai.spy.sandbox();

    beforeEach(() => {
  //      logger.configureLoggerLevel('OFF');
    //    sandbox.on(logger, ['logInfo', 'logError', 'logWarn']);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('apiUpdateUser', () => {
        it('The apiUpdateUser function being tested normally', async () => {

        });
    })

    describe('load()', () => {
        it('The load function being tested normally', async () => {
            const component = new Component();
            expect(await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`))).to.be.true;
        });

        it('The load function being tested without a config file loaded', async () => {
            const component = new Component();
            expect(await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), null)).to.be.false;
        });

        it('The load function being tested without a config file loaded - shoots out errorLog', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), null);
            expect(logger.logError).to.have.been.called.with('Unable to read configuration for test');
        });


        it('The load function being tested without a schedule interval in the config file loaded', async () => {
            const component = new Component();
            expect(await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config-no-schedule.json`))).to.be.false;
        });

        it('The load function being tested without a schedule interval in the config file loaded - shoots our error log', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config-no-schedule.json`));
            expect(logger.logError).to.have.been.called.with('Missing scheduling configuration for test');
        });

        it('The load function being tested without a schedule interval number in the config file loaded', async () => {
            const component = new Component();
            expect(await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config-no-schedule-interval-number.json`))).to.be.false;
        });

        it('The load function being tested without a schedule interval number in the config file loaded - shoots our error log', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config-scheduled-not-enabled.json`));
            expect(logger.logWarn).to.have.been.called.with('The test will be loaded, however, it is set to disabled');
        });
    });

    describe('handleMessage()', () => {
        it('The handleMessage function tested - run complete', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            const message = [];
            message['command'] = 'run-complete';
            component.handleMessage(message);

            expect(logger.logInfo).to.have.been.called.with('The component test has successfully run');
        });
    });

    describe('handleError()', () => {
        it('The handleError function tested - Error occured', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test-error/index.js`), resolve(`${__dirname}/../../test/components/test-error/config.json`));
            component.handleError([]);

            expect(logger.logError).to.have.been.called.with('The component test has encountered an error');
        });
    });

    describe('handleExit()', () => {

        it('The handleExit function tested - has exited with an uncaught fatal exception', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test-error/index.js`), resolve(`${__dirname}/../../test/components/test-error/config.json`));

            component.handleExit(1);

            expect(logger.logError).to.have.been.called.with('The component test has exited with an uncaught fatal exception.');
        });

        it('The handleExit function tested - exited with a fatal error', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test-error/index.js`), resolve(`${__dirname}/../../test/components/test-error/config.json`));
            component.handleExit(5);

            expect(logger.logError).to.have.been.called.with('The component test has exited with a fatal error.');
        });

        it('The handleExit function tested - has exited cleaning', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test-error/index.js`), resolve(`${__dirname}/../../test/components/test-error/config.json`));
            component.handleExit(3);

            expect(logger.logInfo).to.have.been.called.with('The component test has exited cleanly.');
        });

        it('The handleExit function tested - child = undefined', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test-error/index.js`), resolve(`${__dirname}/../../test/components/test-error/config.json`));
            component.handleExit(3);

            expect(component.active).to.be.equal(false);
        });
    });

    describe('readConfig()', () => {
        it('The readConfig function tested sucessfully', async () => {
            const component = new Component();
            expect(await component.readConfig(resolve(`${__dirname}/../../test/components/test/config.json`))).to.be.deep.equal({
                    "schedule": {
                        "interval": 60000,
                        "enabled": true
                    },
                    "userData": {
                        "accounts": [
                            {
                                "name": "auth",
                                "cloud": "us",
                                "user": {
                                    "accountId": "095f1d29-4cf2-4e5a-8741-5584685e31f1",
                                    "username": "watchdoguspublicauth"
                                }
                            }
                        ]
                    }
                }
            );
        });

        it('The readConfig function tested with null value', async () => {

            const component = new Component();
            expect(await component.readConfig(null)).to.be.deep.equal(undefined);
        });

        it('The readConfig function tested with improper json', async () => {
            const component = new Component();
            expect(await component.readConfig(resolve(`${__dirname}/../../test/components/test/config-no-json.js`))).to.be.deep.equal(undefined);
        });

    });
    describe('name()', async () => {
        it('The getter name being tested', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            expect(component.name).to.be.equal('test');
        });
    });

    describe('config()', async () => {
        it('The getter config being tested', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            expect(component.config).to.be.deep.equal({
                "schedule": {
                    "interval": 60000,
                    "enabled": true
                },
                "userData": {
                    "accounts": [
                        {
                            "name": "auth",
                            "cloud": "us",
                            "user": {
                                "accountId": "095f1d29-4cf2-4e5a-8741-5584685e31f1",
                                "username": "watchdoguspublicauth"
                            }
                        }
                    ]
                }
            });
        });
    });

    describe('schedule()', async () => {
        it('The getter schedule being tested', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));

            expect(component.schedule).to.be.deep.equal({enabled: true, next: 0, interval: 60000});
        });
    });

    describe('active()', async () => {
        it('The getter active being tested', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            await component.run();

            expect(component.active).to.be.equal(true);
        });
    });

    describe('generateFork()', () => {
        it('The generateFork function being tested, does it execute Child Process', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));

            const childFork = await component.generateFork({detached: true, timeout: 1000, silent: true});
            expect(childFork.constructor.name).to.be.equal('ChildProcess');
        });

        it('The generateFork function being tested, does it execute the correct file', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            const childFork = await component.generateFork({detached: true, timeout: 1000, silent: true});
            expect(childFork.spawnargs[1]).to.be.equal(resolve(`${__dirname}/../../test/components/test/index.js`));
        });

        it('The generateFork function being tested, does it have handleMessage event', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            const childFork = await component.generateFork({detached: true, timeout: 1000, silent: true});

            expect(childFork._events.message.name.toString()).to.be.equal('bound handleMessage');
        });

        it('The generateFork function being tested, does it have exitMessage event', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            const childFork = await component.generateFork({detached: true, timeout: 1000, silent: true});

            expect(childFork._events.exit[0].name).to.be.equal('bound onceWrapper');
            expect(childFork._events.exit[1].name).to.be.equal('bound handleExit');
        });

        it('The generateFork function being tested, does it have standardError event', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            const childFork = await component.generateFork({detached: true, timeout: 1000, silent: true});

            expect(childFork.stderr._events.data.name.toString()).to.be.equal('bound handleError');
        });
    });

    describe('run()', () => {
        it('The run function being tested, does it execute Child Process', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`), resolve(`${__dirname}/../../test/components/test/config.json`));
            await component.run();
        });

        it('The run function being tested, does it execute Child Process - config not there', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test/index.js`));
            await component.run();
            expect(logger.logError).to.have.been.called.with('Unable to read configuration for test') ||
            expect(logger.logError).to.have.been.called.with('Unable to run test: missing config or schedule');
        });

        it('The run function being tested, does it execute Child Process - timeout works', async () => {
            const component = new Component();
            await component.load('test', resolve(`${__dirname}/../../test/components/test-timeout.js`), resolve(`${__dirname}/../../test/components/test-timeout.config.json`));
            await component.run();
            await component.run();

            expect(logger.logError).to.have.been.called.with('Unable to run test: component still running');
        });
    });
});
*/

