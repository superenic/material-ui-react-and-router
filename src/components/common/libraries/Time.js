export default class Time {
    /**
     * 
     * @param {Date} time 
     */
    constructor(time)
    {
        this.time = time;
    }

    convertToUtcTimestamp()
    {
        const timing = this.time;

        return Date.UTC(
            timing.getUTCFullYear(),
            timing.getUTCMonth(),
            timing.getUTCDate() , 
            timing.getUTCHours(),
            timing.getUTCMinutes(),
            timing.getUTCSeconds(),
            timing.getUTCMilliseconds());
    }
}