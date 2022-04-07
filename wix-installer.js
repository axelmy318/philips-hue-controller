const MSICreator = require('electron-wix-msi')

const build = async() => { 
// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: './build',
  description: 'Philips HUE Controller',
  exe: 'Philips-HUE-Controller',
  name: 'Philips HUE Controller',
  manufacturer: 'axelmy318',
  version: '1.0.0',
  outputDirectory: './build-wix-msi'
});

// Step 2: Create a .wxs template file
const supportBinaries = await msiCreator.create();

// 🆕 Step 2a: optionally sign support binaries if you
// sign you binaries as part of of your packaging script
supportBinaries.forEach(async (binary) => {
  // Binaries are the new stub executable and optionally
  // the Squirrel auto updater.
  await signFile(binary);
});

// Step 3: Compile the template to a .msi file
await msiCreator.compile();
}

build()