class Level1Scene
{
    constructor()
    {
        this.ActiveObjects = [];
        this.CreateLevel1();
    }

    CreateObject(x, y)
    {
        let temp = new BaseObject(x, y);
        this.ActiveObjects.push(temp);
        return temp;
    }
    

    CreateLevel1()
    {
        let spaceBackground = loadImage("Assets/Images/Level1/Level1Background.png");
        let backButton      = loadImage("Assets/Images/LevelSelection/BackButton.png");
        let meteorImage     = loadImage("Assets/Images/Level1/Meteor.png");
        let homePlanet = loadImage("Assets/Images/Level1/HomePlanet.png");
        let timerFont = loadFont("Assets/Fonts/PrimaryFont.ttf");

        let obj_spaceBackground = this.CreateObject(0, 0);
        obj_spaceBackground.AddComponent(new ImageComponent(obj_spaceBackground, spaceBackground, 1920, 970));

        let obj_homePlanet = this.CreateObject(800, 400);
        obj_homePlanet.AddComponent(new ImageComponent(obj_homePlanet, homePlanet, 250, 250));

        let obj_timer = this.CreateObject(800, 100);
        obj_timer.AddComponent(new TextComponent(obj_timer, "", timerFont, 95, (255, 255, 255)));
        obj_timer.AddComponent(new TextBasedTimer(obj_timer, obj_timer.GetComponent(0)));


        let obj_backButton = this.CreateObject(40, 740);
        this.CreateButton(obj_backButton, backButton, 250, 250, .1, -1, ["load"], ["LevelSelection"]);

        let obj_meteorSpawner = this.CreateObject(0, 0);
        obj_meteorSpawner.AddComponent(
            new MeteorSpawner(
                obj_meteorSpawner, 
                [meteorImage], 
                [5, 25],
                [1, 1],
                25
            ));
    }

    CreateButton(bObj, _image, width, height, expansionAmount, radius, eventTags, events, yMin = -1, yMax = -1, yRate = -1, xMin = -1, xMax = -1, xRate = -1)
    {
       bObj.AddComponent(new ImageComponent(bObj, _image, width, height, expansionAmount, radius));
       bObj.AddComponent(new ButtonComponent(bObj, width, height, eventTags, events, radius));

       if (yRate != -1)
       {
        bObj.AddComponent(new HoverMovement(bObj, true, yMin, yMax, yRate));
       }
       else
       {
        bObj.AddComponent(new HoverMovement(bObj, true, bObj.y, bObj.y, 0));
       }
       
       if (xRate != -1)
       {
        bObj.AddComponent(new HoverMovement(bObj, false, xMin, xMax, xRate));    
       }
       else
       {
        bObj.AddComponent(new HoverMovement(bObj, false, bObj.x, bObj.x, 0));    
       }
       
    }
}