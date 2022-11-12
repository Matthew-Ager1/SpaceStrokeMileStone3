class Level3Scene
{
    constructor()
    {
        this.ActiveObjects = [];
        this.CreateLevel3();
    }

    CreateObject(x, y)
    {
        let temp = new BaseObject(x, y);
        this.ActiveObjects.push(temp);
        return temp;
    }
    

    CreateLevel3()
    {
        let spaceBackground = loadImage("Assets/Images/Level3/Level3Background.png");
        //let font            = loadFont("Assets/Fonts/PrimaryFont.ttf");
        let backButton      = loadImage("Assets/Images/LevelSelection/BackButton.png");

        let obj_spaceBackground = this.CreateObject(0, 0);
        obj_spaceBackground.AddComponent(new ImageComponent(obj_spaceBackground, spaceBackground, 1920, 970));

        let obj_gameManager = this.CreateObject(0, 0);
        obj_gameManager.AddComponent(new Level3GameManager(obj_gameManager));

        //let text_obj = this.CreateObject(200, 300);
        //text_obj.AddComponent(new TextComponent(text_obj, "     Level 3:\nUnder Construction", font, 95, (255, 255, 255)));

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