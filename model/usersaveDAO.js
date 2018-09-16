const DAO = require('../model/DAO')
class DB{
    //用户收藏房源
    usersave(save){
        console.log('第三步传数据')
        console.log(save);
        return DAO('insert into user_save values(?,?)',
            [save.uId,save.pId]);
    }
}

module.exports = new DB();
