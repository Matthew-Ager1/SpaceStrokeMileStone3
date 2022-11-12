class Level2Scene
{
    constructor()
    {
        this.ActiveObjects = [];
        this.CreateLevel2();
    }

    CreateObject(x, y)
    {
        let temp = new BaseObject(x, y);
        this.ActiveObjects.push(temp);
        return temp;
    }
    

    CreateLevel2()
    {
        let spaceBackground = loadImage("Assets/Images/Level2/Level2Background.png");
        let font            = loadFont("Assets/Fonts/PrimaryFont.ttf");
        textFont(font);
        let backButton      = loadImage("Assets/Images/LevelSelection/BackButton.png");
        let gameRing        = loadImage("Assets/Images/Level2/BigBlackRing.png");
        let playerImage     = loadImage("Assets/Images/Level2/BlackHole.png");
        let spaceMan        = loadImage("Assets/Images/Level2/PixelSpaceMan.png");

        let obj_spaceBackground = this.CreateObject(0, 0);
        obj_spaceBackground.AddComponent(new ImageComponent(obj_spaceBackground, spaceBackground, 1920, 1130));

        let obj_gameRing = this.CreateObject(515, 15);
        obj_gameRing.AddComponent(new ImageComponent(obj_gameRing, gameRing, 900, 900));

        let obj_player = this.CreateObject(550, 250);
        obj_player.AddComponent(new ImageComponent(obj_player, playerImage, 75, 75));

        let obj_gameManager = this.CreateObject(0, 0);
        obj_gameManager.AddComponent(new Level2GameManager(obj_gameManager, obj_player, 75, spaceMan));

        //let text_obj = this.CreateObject(200, 300);
        //text_obj.AddComponent(new TextComponent(text_obj, "     Level 2:\nUnder Construction", font, 95, (255, 255, 255)));

        let obj_backButton = this.CreateObject(40, 740);
        this.CreateButton(obj_backButton, backButton, 250, 250, .1, -1, ["load"], ["LevelSelection"]);
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