const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('../config/environment');
const UserService = require('../services/users.service');

const usersService = new UserService();

class AuthService {
  constructor() {}

  signToken(user) {
    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.tokenSecret);

    return {
      token,
    };
  }

  async getUser(email, password) {
    const user = await usersService.findByEmail(email);

    const { password: userPassword, ...rest } = user.dataValues;
    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch) {
      throw boom.unauthorized();
    }

    return rest;
  }

  async getCurrentUser(id) {
    const user = await usersService.findOne(id);
    const { password: _, ...userInfo } = user.toJSON();

    return userInfo;
  }

  async register(data) {
    const user = await usersService.create(data);
    return user;
  }

  async sendRecovery(email) {
    const user = await usersService.findByEmail(email);

    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.tokenSecret, { expiresIn: '30min' });
    const link = `${config.recoveryLink}?token=${token}`;

    await usersService.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.nodemailerEmail,
      to: user.email,
      subject: 'Recupera tu cuenta!',
      html: `<b>Parece que olvidaste tu contraseña. utiliza este link para recuperarla: <a href="${link}">link</a>`,
    };

    return this.sendMail(mail);
  }

  async changePassword(recoveryToken, newPassword) {
    try {
      const { sub: userId } = jwt.verify(recoveryToken, config.tokenSecret);

      const user = await usersService.findOne(userId);

      if (user.recoveryToken !== recoveryToken) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await usersService.update(userId, {
        password: hash,
        recoveryToken: null,
      });

      return { message: 'Cambiaste tu contraseña correctamente' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(emailContent) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.nodemailerEmail,
        pass: config.nodemailerPassword,
      },
    });

    await transporter.sendMail(emailContent);

    return {
      message: 'Email enviado correctamente',
    };
  }
}

module.exports = AuthService;
