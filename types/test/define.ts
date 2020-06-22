import { DataTypes, Model } from 'sequelize';
import { sequelize } from './connection';

// I really wouldn't recommend this, but if you want you can still use define() and interfaces

interface UserAttributes {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes extends Partial<UserAttributes> {}

interface User extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}

type UserModel = {
    new (): User
    customStaticMethod(): unknown
} & typeof Model;

const User = sequelize.define<User>('User', { firstName: DataTypes.STRING }, { tableName: 'users' }) as UserModel;

async function test() {
    User.customStaticMethod();

    const user: User = new User();

    const user2: User = (await User.findOne()) as User;

    user2.firstName = 'John';

    await user2.save();
}
