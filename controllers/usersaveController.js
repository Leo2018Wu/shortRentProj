var usersaveDAO = require('../model/usersaveDAO');
module.exports= {
    usersave: async (query, next) => {
        let save = {};
        save.uId = query.uid;
        save.pId = query.pid;
        console.log('第二步传数据')
        console.log(save);
        try {
            await usersaveDAO.usersave(save)
            ctx.body = ('收藏成功');
            return;
        }
        catch (err) {
            ctx.body = {"code": 500, "message": err.toString(), data: []}
        }
    }
}

