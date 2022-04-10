# Philips HUE Controller 👋

A desktop application that allows you to connect to your philips HUE bridges and controls the lights in your home 💡

## Disclaimer
The only purpose of this app is experimental. There are way better and more complete apps out there. This is just my take on an home automation app.

## Main stuff used in the project 🔨
- Framework
    - Electron, ReactJS + Redux, bootstrap
- Building and packaging
    - electron-packager, electron-builder, electron-updater
- Other
    - Philips HUE API

## Devices supported in the app 💻
- Now
  - HUE Bridges
  - HUE Lightbulbs
- Next...
  - Smart plugs
  - HUE Lightstrips

## How to use it 🤔

### Connecting a bridge
The first time you launch the app, you will land on the bridge page.
From there. you can scan your network to find any bridges.

![image1](https://i.imgur.com/6YAsvGy.png)

By clicking on "connect" on your HUE bridge, you will be asked to give it a name

![image2](https://i.imgur.com/yGfYuLE.png)

After clicking on "start", you will have 45s to press the link button (central button) on the HUE bridge.

![image3](https://i.imgur.com/1fyzA5s.png)

As soon as you clicked on the link button, the bridge will be added to your list. 

![image4](https://i.imgur.com/8K2epYE.png)

This list will then be saved to a local storage so that quitting or updating the apps doesn't require a reconnection.

### Controlling your lights

The lights connected to your bridge will be automatically loaded into the app.
You can view and control them by clicking on the "Controls" tab in the sidebar

![image5](https://i.imgur.com/nj82Pe0.png)

To change and light's color, click on it. It will add to the selected lights, shown with a grey background. 

By pressing "ctrl" at the same time you click on the light, you can select multiple lights to change all the colors at once.

You can then play with the sliders on top to change the light's color.

To switch a light on and off, you can simply click on the bottom of the ON/OFF text.

### Updating the app

In the settings tab, there is a card allowing you to automatically update the app.

![image6](https://i.imgur.com/JZCfEMh.png)

To update the app, click on "check for udpate". If a new version is available, it will be downloaded, showing a progress bar and percentage. Once the download is finished, you will be able to click on a button to restart and apply the update.