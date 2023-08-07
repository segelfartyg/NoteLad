# The NoteLad Project
This is the official repo of the NoteLad animation project.

## Introduction
This repo contains the source code for NoteLad. NoteLad is an animation application made with React. It is used to create animations from 
text-components defined in a word editor. The goal of the project is to make it possible to quickly write something down in a text editor
and immidiately start animating the different parts of the authored text.

## Setup 
Right now, the project consists of two parts: one client and one server. The client is responsible for creating the animations and the server is responsible 
for saving them. 

To use the application do as follows:

1. Make sure you have Node and NPM installed on your system. Then clone this repo.

2. Navigate into the directory, then use "npm install" to install dependencies. Afterwards, cd into the client folder of the repo and do the same.

3. Go back to root folder, then run "npm run dev" to start both the server and the client.

4. Start animating.

## Making animations
The general concept of making animations through NoteLad is based around frames and moving components for every frame, just like a flipnote.

To get started, use the text editor to write some text. An example could be a few paragraphs. When you have written some text, 
press the menu button on the left hand side to open the NoteLad toolbar. 
While in this menu, press the "switch" button to switch mode to animation mode. Now you have all the components (paragraphs in this example) 
graphically represented on your first and only frame. Now you can start animating. Do so by added frames using the "add frame" button in the menu. Now, if you
scroll through the frames that you have created. Nothing happens right? This is because you havent touched the components yet. You can do so
by pressing and holding the components while moving the mouse. You can do this in every frame, so make sure to try to move the component in other frames
as well.

One way of playing with the tool is to let a component move a litte bit to a direction for every frame. When you are happy with each components position
in each frame, press the "Play alternate"-button to make the animation start. To change the speed of the animation, enter a value in the empty input area. 
The lower the value, the faster the animation will play.

## Future ideas
Make better word editor integration, better database support, color themes, hosting options, containerize the whole thing. 

## Trivia 
This repo is maintained and developed by Samuel Swarén. A special thanks to Flipnote Studio that was a big inspiration during the development of this project.
