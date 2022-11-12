/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

let ActiveObjects = [];
let ActiveButtons = [];
let ActiveScene = null;

let mainMenuScene;
let levelSelectionScene;
let settingsScene;

let level1Scene;
let level2Scene;
let level3Scene;
let level4Scene;

let InTransition = false;
let TransitionTimer = 1.0;
let screenCover;

let ActiveObjectsDirty = false;

let TransitionEventQueue = [];

function setup()
{
  angleMode(DEGREES);
  createCanvas(1920, 970);
  background(0);

  screenCover = new BaseObject(1920/2 - 90, 970/2-50);
  screenCover.AddComponent(new ImageComponent(screenCover, loadImage("Assets/Images/FadeGradient.png"), 100, 100));

  mainMenuScene = new MainMenuScene();
  levelSelectionScene = new LevelSelectionScene();
  settingsScene = new SettingsScene();

  level1Scene = new Level1Scene();
  level2Scene = new Level2Scene();
  level3Scene = new Level3Scene();
  level4Scene = new Level4Scene();

  LoadScene("MainMenu");
}

function draw() //this function runs the whole program
{
  SceneManagement();

  UpdateActiveObjects();

  CleanActiveObjects();

  LateDraw();
}

function CleanActiveObjects()
{
  if (ActiveObjectsDirty)
  {
    for (let i = 0; i < ActiveObjects.length; i++)
    {
      if (ActiveObjects[i].destroyed)
      {
        ActiveObjects.splice(i, 1);
        i--;
      }
    }

    ActiveObjectsDirty = false;
  }
}

function SceneManagement()
{
  if (InTransition)
  {
    if (ActiveScene != null)
    {
      SceneTransition(ActiveScene);
    }  
  } 
}

function UpdateActiveObjects()
{
  for (let i = 0; i < ActiveObjects.length; i++)
  {
    ParseGameEvents(ActiveObjects[i].UpdateComponents());   
  }
}

function ParseGameEvents(gameEvents)
{
  if (!InTransition)
  {
    for (let i = 0; i < TransitionEventQueue.length; i++)
    {
      gameEvents.push(TransitionEventQueue[i]);
    }
    TransitionEventQueue = [];

    for (let i = 0; i < gameEvents.length; i++)
    {
      if (gameEvents[i] == null || gameEvents[i] == "")
      {
        continue;
      }

      console.log("Parsing: " + gameEvents[i]);

      while (gameEvents[i].length >= 2)
      {
        if (gameEvents[i][0] == "load")
        {     
          LoadScene(gameEvents[i][1]);
        }
        if (gameEvents[i][0] == "create")
        {
          console.log("Created: " + gameEvents[i][1]);
          ActiveObjects.push(gameEvents[i][1]);
        }
        if (gameEvents[i][0] == "destroy")
        {
          gameEvents[i][1].destroyed = true;
          ActiveObjectsDirty = true;
        }
        if (gameEvents[i][0] == "reset")
        {
          ResetScene(gameEvents[i][1]);
        }

        gameEvents[i] = gameEvents[i].slice(2);
      }
    }
  }
  else
  {
    TransitionEventQueue.push(gameEvents);
  }
}


//event functions
function LoadScene(sceneName)
{
  console.log("Loading Scene: " + sceneName); 
  ActiveObjects = []
  ActiveButtons = []

  ResetSceneNoLoad(sceneName);
 
  if (sceneName == "MainMenu")
  {
    ActiveScene = mainMenuScene;
  }
  else if (sceneName == "LevelSelection")
  {
    ActiveScene = levelSelectionScene;
  }
  else if (sceneName == "Level1")
  {
    ActiveScene = level1Scene;
  }
  else if (sceneName == "Level2")
  {
    ActiveScene = level2Scene;
  }
  else if (sceneName == "Level3")
  {
    ActiveScene = level3Scene;
  }
  else if (sceneName == "Level4")
  {
    ActiveScene = level4Scene;
  }
  else if (sceneName == "Settings")
  {
    ActiveScene = settingsScene;
  }
  else
  {
    return;
  }


  InTransition = true;
  TransitionTimer = .5;
  ActiveObjects.push(screenCover);
  console.log("Active Objects Count: " + ActiveObjects.length);
}

function ResetScene(sceneName)
{
  if (sceneName == "MainMenu")
  {
    mainMenuScene = new MainMenuScene();
  }
  else if (sceneName == "LevelSelection")
  {
    levelSelectionScene = new LevelSelectionScene();
  }
  else if (sceneName == "Level1")
  {
    level1Scene = new Level1Scene();
  }
  else if (sceneName == "Level2")
  {
    level2Scene = new Level2Scene();
  }
  else if (sceneName == "Level3")
  {
    level3Scene = new Level3Scene();
  }
  else if (sceneName == "Level4")
  {
    level4Scene = new Level4Scene();
  }
  else if (sceneName == "Settings")
  {
    settingsScene = new SettingsScene();
  }

  LoadScene(sceneName);
}

function ResetSceneNoLoad(sceneName)
{
  if (sceneName == "MainMenu")
  {
    mainMenuScene = new MainMenuScene();
  }
  else if (sceneName == "LevelSelection")
  {
    levelSelectionScene = new LevelSelectionScene();
  }
  else if (sceneName == "Level1")
  {
    level1Scene = new Level1Scene();
  }
  else if (sceneName == "Level2")
  {
    level2Scene = new Level2Scene();
  }
  else if (sceneName == "Level3")
  {
    level3Scene = new Level3Scene();
  }
  else if (sceneName == "Level4")
  {
    level4Scene = new Level4Scene();
  }
  else if (sceneName == "Settings")
  {
    settingsScene = new SettingsScene();
  }
}

function SceneTransition(newScene)
{  
  SceneManagementUtility.sceneLoading = true;
  if (TransitionTimer > 0)
  {
    TransitionTimer -= deltaTime / 1000.0;
    let val = deltaTime / 1000.0 * 25650;
    screenCover.GetComponent(0).width += val;
    screenCover.GetComponent(0).height += val;
    screenCover.x -= (val / 2.0);
    screenCover.y -= (val / 2.0);

    if (TransitionTimer < 0)
    {
      ActiveObjects = newScene.ActiveObjects;
      ActiveObjects.push(screenCover);
    }
  }
  
  if (TransitionTimer < 0 && TransitionTimer > -.5)
  {
    TransitionTimer -= deltaTime / 1000.0;
    let val = deltaTime / 1000.0 * 25650;
    screenCover.GetComponent(0).width -= val;
    screenCover.GetComponent(0).height -= val;
    screenCover.x += (val / 2.0);
    screenCover.y += (val / 2.0);
  }
  if (TransitionTimer < -.5)
  {
    let ind = ActiveObjects.indexOf(screenCover);
    if (ind != -1)
    {
      ActiveObjects.splice(ind, 1);
    }
    
    InTransition = false;    
  }
  SceneManagementUtility.sceneLoading = false;
}


function LateDraw()
{
  LateDrawRect();

  LateDrawClear();
}

function LateDrawRect()
{
  for (let i = 0; i < LateDrawUtility.RectQueue.length; i++)
  {
    let position = LateDrawUtility.RectQueue[i][0];
    let size = LateDrawUtility.RectQueue[i][1];
    let col = LateDrawUtility.RectQueue[i][2];   

    /*translate(position.x + (size / 2), position.y + (size / 2));
    rotate(rot);
    translate(-(position.x + (size / 2)), -(position.y + (size / 2)));*/

    fill(col);
    strokeWeight(0);

    rect(position.x + (size / 2), position.y + (size / 2), size, size);
  }
}

function LateDrawClear()
{
  LateDrawUtility.RectQueue = [];
}




