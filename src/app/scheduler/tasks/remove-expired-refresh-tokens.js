const BaseTask = require('./base-task');
const { sequelize } = require('../../models');

class RemoveExpiredRefreshTokens extends BaseTask {

    async handle() {
        // Query to delete the tokens older than 7 days
        const deleteQuery = `DELETE FROM refresh_tokens WHERE created_at < now()-'7 day'::interval`;
        await sequelize.query(deleteQuery);
        this.info(`Task: Remove Expired Token, Status: Completed, Finished at : ${new Date()}`);
    }
}

module.exports = RemoveExpiredRefreshTokens;