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

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

type UserModelStatic = typeof UserModel & {
  customStaticMethod(): unknown;
}

const User = sequelize.define<UserModel>(
  'User', { firstName: DataTypes.STRING }, { tableName: 'users' }) as UserModelStatic;

User.customStaticMethod = () => {};

async function test() {
    User.customStaticMethod();

    const user: UserModel = new User();

    const user2: UserModel | null = await User.findOne();
    if (!user2) return;

    user2.firstName = 'John';

    await user2.save();
}

// The below doesn't define Attribute types, but should still work
class UntypedUserModel extends Model {
  public id!: number;
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

type UntypedUserModelStatic = typeof UntypedUserModel & {
  customStaticMethod(): unknown;
}

const UntypedUser = sequelize.define<UntypedUserModel>(
  'User', { firstName: DataTypes.STRING }, { tableName: 'users' }) as UntypedUserModelStatic;

async function testUntyped() {
  UntypedUser.customStaticMethod();

  const user: UntypedUserModel = new UntypedUser();

  const user2: UntypedUserModel | null = await UntypedUser.findOne();
  if (!user2) return;

  user2.firstName = 'John';

  await user2.save();
}
