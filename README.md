# Instruction for run the app 👋

### Recommended to run the app using node Version with (LTS) such- 20.14.0, 18.20.3

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Clone the repository

   ```bash
   git clone https://github.com/sazzad9911/TodoApp.git
   ```

2. Install dependencies

   ```bash
    npm install
   ```

## Before Starting

1. Running on Mobile/Emulator with soft run

   For Android download Expo Go from Play Store
   For iOS download Expo Go from APP STORE

   Then run

   ```bash
    npm start
   ```
   Type 'a' for android and 'i' for run in ios 'w' for web. For run on mobile device scan thr QR code given in the terminal from Expo Go app.

2. Running on emulator/mobile with native build

   Download [android studio](https://developer.android.com/studio?gad_source=1&gclid=CjwKCAjw1K-zBhBIEiwAWeCOFwd9UzxDiivzp4-Sy9QxfpLSn2ixjD4bTfTA6tYlW9_vvnL0bIhyExoCNRgQAvD_BwE&gclsrc=aw.ds) and create an emulator.

   For iOS download Xcode from APP STORE and create an emulator.

   #### Setup environment

   This is the complete document for setup environment
   [Set Up Environment](https://reactnative.dev/docs/set-up-your-environment)

   After setup complete-
   For ios
   ```bash
    npm run ios
   ```
   For android
   ```bash
    npm run android
   ```

## App Features

- Login and Sign up using local storage, Session token will be stored into secret storage

- One account can access only that account tasks.

- One account can create task with title, date, time and image. Also can edit task, delete task and add multiple picture into a single task. Also can remove pictures of tasks.

- Add task with plus button, Delete task o click delete icon, log out into profile tab bar.

- Task pictures can upload from custom gallery with filter albums

- One account will notified when task due time arrive, Notification will show both soft run and native build. But on click the notification will redirect the task details page will only be happen on native build only.(Because there need to configure deep linking, and the deep link will work only when the application is installed into a device)

Note: Don't close the app from background when run into native build. Because it connected to your local server which gives update if any code changes.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
