import pino, { Logger } from "pino";


export function getLogger(name: string): Logger {
    return pino({
        name,
        level: process.env.LOG_LEVEL || 'info',
        formatters: {
            bindings: (bindings) => {
                return { pid: bindings.pid, host: bindings.hostname };
            },
            level: (label) => {
                return { level: label.toUpperCase() };
            },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
    });
}