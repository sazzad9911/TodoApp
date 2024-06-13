import AsyncStorage from '@react-native-async-storage/async-storage';
// const storeData = async (value) => {
//     try {
//         const jsonValue = JSON.stringify(value);
//         await AsyncStorage.setItem('my-key', jsonValue);
//     } catch (e) {
//         // saving error
//     }
// };
// const getData = async () => {
//     try {
//         const jsonValue = await AsyncStorage.getItem('my-key');
//         return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {
//         // error reading value
//     }
// };
interface UserTypes {
    email: string;
    password: string;
}
export const storeUser = async (value: UserTypes) => {
    const oldValue = await AsyncStorage.getItem('users');
    let userList: UserTypes[] = []
    if (oldValue) {
        const old = JSON.parse(oldValue) as UserTypes[]
        old?.map(user => {
            userList.push(user)
        })
    }
    if (userList.find(usr => usr.email === value.email)) {
        return null
    }
    userList.push(value)
    const jsonValue = JSON.stringify(userList);
    await AsyncStorage.setItem('users', jsonValue);
    return `${value.email}+${value.password}`
}
export const findUser = async (value: UserTypes) => {
    const oldValue = await AsyncStorage.getItem('users') as string
    const userList = JSON.parse(oldValue) as UserTypes[]
    //console.log(userList)
    if (userList.find(usr => usr.email === value.email && usr.password === value.password)) {
        return `${value.email}+${value.password}`
    }
    return null
}