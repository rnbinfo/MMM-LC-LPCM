# Project Description

# Background
This project is derived from another pure voice-based chatbot project without display, so there may be some redundancy in the code during the porting process. Of course, after I have a deeper understanding of the MagicMirror framework, I will improve it.

The project mainly uses snowboy hotword detection to trigger the recording control, and uses Google/text2speech and Google/speech2text to convert between text and speech. Finally, the default module of MagicMirror, compliments, is used to output text and play sound through the hardware.

The hardware microphone used is the ReSpeaker 2-Mics Pi HAT. For specific usage, please refer to the official documentation: https://wiki.seeedstudio.com/ReSpeaker_2_Mics_Pi_HAT_Raspberry/#driver-installation-and-configuration

This project consists of four basic modules that are essential for its operation. If you need to install it, you need to install the four projects MMM-LC-Main, MMM-LC-LPCM, MMM-LC-HotWord, and MMM-LC-Text2Speech in the modules directory of MagicMirror.

LC is our AI assistant, whose full name is Little Carrie.

LittleCarrie's AI processing logic is currently implemented using ChatGPT, a large language model trained by OpenAI that is based on the GPT-3.5 architecture. However, users can choose to use any other AI processing engine that they prefer.

# Module Description
| modules          | Description
|----------------- |-----------
| `MMM-LC-Main`        | control module, process control
| `MMM-LC-LPCM`        | Recording module
| `MMM-LC-HotWord`     | Wake-up word detection module
| `MMM-LC-Text2Speech` | Text-to-speech module

# MMM-LC-LPCM
The MMM-LC-LPCM module is the recording control module of LittleCarrie, responsible for controlling the microphone to start and stop recording, and sending the recorded audio data to other modules for processing.

# install some dependents(you might be need to install these first)
sudo apt-get update
sudo apt-get install build-essential zlib1g-dev libffi-dev libssl-dev libbz2-dev libreadline-dev libsqlite3-dev liblzma-dev libncurses-dev libmagic-dev libatlas-base-dev sox libsox-fmt-all -y

# Installation
`cd modules` -> `git clone https://github.com/rnbinfo/MMM-LC-LPCM.git`


