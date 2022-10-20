const { JSON } = require('sequelize');
const { user } = require('../../models');

exports.addUser = async (req, res) => {
  try {
    const data = {
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      scope: req.body.scope,
    };
    await user.create(data);
    res.status(200).send({
      status: 'sucess Add User',
      message: 'add finish',
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await user.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { userid, scope } = req.headers;

    const userExist = await user.findOne({
      where: {
        userid,
        scope,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    if (!userExist) {
      return res.status(401).send({
        responseCode: 401,
        responseMessage: 'UNAUTHORIZED',
      });
    }
    res.status(200).send({
      status: 'success...',
      data: {
        user: userExist,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
