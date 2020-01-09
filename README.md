# HIV Recency Mobile/Tablet app

Please note that this app requires Recency Web Application (https://github.com/deforay/recency-web) to be set up and running on a web server that can be reached over the internet.

---

The current release can be found on Google play store

https://play.google.com/store/apps/details?id=com.deforay.recency

---

### Building Android app on your own

#### Before Setting up :

* Install NodeJS (https://nodejs.org)
* Install Java SE Developer Kit 8 (jdk8) for your operating system
* Install Android Studio, Android SDK and gradle (https://developer.android.com/studio#downloads)
* Select the latest Android versions in the SDK Manager
* Enable USB access and developer mode in your Android device 
* Add ANDROID_HOME and JAVA_HOME in your system PATH environment variable


#### Building and Running Android app :


* Clone this repository or download the ZIP file from the link above
* To install required node packages, run <code>npm install</code>
* In the commandline : <code>ionic cordova platform add android</code>
* Once the android platform is added , To build the app : <code>ionic cordova build android</code>
* To run the application in a connected device : <code>ionic cordova run android</code> (make sure your android device is connected in developer mode and USB Debugging is enabled)


#### Production Build for Android app :

To build your app for production, run

<code>ionic cordova build --release android</code>

#### Publishing your Android app :

* Edit Your App Version in config.xml

Example : 
<widget id="com.deforay.recency" version="2.8" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">

* If you want to release your app in the Google Play Store, you have to sign your APK file. If you already have a Signing Keystore.

Then run the below command to sign the unsigned APK:

<code>jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk my-alias</code>

* If you don't have a keystore then you have to create a new certificate/keystore.
Let’s generate your private key using the keytool command that comes with the JDK:

<code>keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias</code>

You’ll first be prompted to create a password for the keystore. Then, answer the rest of the nice tools’s questions and when it’s all done, you should have a file called my-release-key.jks created in the current directory.

Note: Make sure to save this file somewhere safe, if you lose it you won’t be able to submit updates to your app!

Now keystore will be created in the current directory. Follow the step 2 for signing the APK.

* This signs the APK in place. Finally, we need to run the zip align tool to optimize the APK. 

<code>zipalign -v 4 app-release-unsigned.apk RECENCY.apk</code>

* Now we have our final release binary called RECENCY.apk

Visit the website https://play.google.com/apps/publish/signup/

Once you have a developer account, you can go ahead and click “Publish an Android App on Google Play”

#### Updating your Android app :

As you develop your app, you’ll want to update it periodically.

In order for the Google Play Store to accept updated APKs, you’ll need to edit the config.xml file to increment the version value, then rebuild the app for release.
