/**
 * awaits timeout asynchronously
 *
 * @param {number} ms amount of milliseconds
 */
export async function sleep(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}