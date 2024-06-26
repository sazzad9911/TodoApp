import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
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
    if (userList?.find(usr => usr.email === value.email && usr.password === value.password)) {
        return `${value.email}+${value.password}`
    }
    return null
}
interface TasksTypes {
    title: string,
    image: string,
    id: string,
    dueDate: Date
    date: Date,
    user: string,
    check: boolean
}
export const storeTask = async (title: string, image: string, dueDate: Date, user: string) => {
    const oldValue = await AsyncStorage.getItem('tasks');
    let List: TasksTypes[] = []
    if (oldValue) {
        const old = JSON.parse(oldValue) as TasksTypes[]
        old?.map(d => {
            List.push(d)
        })
    }
    const d = {
        id: uuid.v1().toString(),
        date: new Date(),
        dueDate: dueDate,
        image: image,
        user: user,
        title: title,
        check: false
    }
    List.push(d)
    const jsonValue = JSON.stringify(List);
    await AsyncStorage.setItem('tasks', jsonValue);
    return d
}
export const allTask = async (user: string) => {
    const oldValue = await AsyncStorage.getItem('tasks') as string
    const jsonValue = oldValue ? JSON.parse(oldValue) as TasksTypes[] : []

    return jsonValue.filter(d => d.user === user)
}
export const checkTask = async (id: string, check: boolean) => {
    const oldValue = await AsyncStorage.getItem('tasks') as string
    const data = oldValue ? JSON.parse(oldValue) as TasksTypes[] : []
    const newVal = data.map(d => {
        if (d.id === id) {
            return {
                ...d,
                check: check
            }
        }
        return d
    })
    //console.log(newVal)
    const jsonValue = JSON.stringify(newVal);
    return await AsyncStorage.setItem('tasks', jsonValue);
}
export const updateTask = async (title: string, image: string, dueDate: Date, id: string) => {
    const oldValue = await AsyncStorage.getItem('tasks') as string
    const data = oldValue ? JSON.parse(oldValue) as TasksTypes[] : []
    const newVal = data.map(d => {
        if (d.id === id) {
            return {
                ...d,
                title: title,
                image: image,
                dueDate: dueDate,
            }
        }
        return d
    })
    //console.log(newVal)
    const jsonValue = JSON.stringify(newVal);
    return await AsyncStorage.setItem('tasks', jsonValue);
}
export const deleteTask = async (id: string) => {
    const oldValue = await AsyncStorage.getItem('tasks') as string
    const data = oldValue ? JSON.parse(oldValue) as TasksTypes[] : []
    const newVal = data.filter(d => d.id != id)
    //console.log(newVal)
    const jsonValue = JSON.stringify(newVal);
    return await AsyncStorage.setItem('tasks', jsonValue);
}
export const getTask = async (id: string) => {
    const oldValue = await AsyncStorage.getItem('tasks') as string
    const data = oldValue ? JSON.parse(oldValue) as TasksTypes[] : []

    return data.find(d => d.id === id)
}
interface ImagesTypes {
    uri: string,
    id: string,
    taskId: string
}
export const addImage = async (taskId: string, uri: string) => {
    const oldValue = await AsyncStorage.getItem('images');
    let List: ImagesTypes[] = []
    if (oldValue) {
        const old = JSON.parse(oldValue) as ImagesTypes[]
        old?.map(d => {
            List.push(d)
        })
    }
    List.push({
        id: uuid.v1().toString(),
        taskId: taskId,
        uri: uri
    })
    const jsonValue = JSON.stringify(List);
    return await AsyncStorage.setItem('images', jsonValue);
}
export const allImages = async (taskId: string) => {
    const oldValue = await AsyncStorage.getItem('images') as string
    const jsonValue = oldValue ? JSON.parse(oldValue) as ImagesTypes[] : []

    return jsonValue.filter(d => d.taskId === taskId)
}
export const deleteImage = async (imageId: string) => {
    const oldValue = await AsyncStorage.getItem('images') as string
    const data = oldValue ? JSON.parse(oldValue) as ImagesTypes[] : []
    const newVal = data.filter(d => d.id != imageId)
    //console.log(newVal)
    const jsonValue = JSON.stringify(newVal);
    return await AsyncStorage.setItem('images', jsonValue);
}