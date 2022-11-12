class LevelSelectionScene
{
    constructor()
    {
        this.ActiveObjects = [];
        this.CreateLevelSelection();
    }

    CreateObject(x, y)
    {
        let temp = new BaseObject(x, y);
        this.ActiveObjects.push(temp);
        return temp;
    }

    CreateLevelSelection()
    {
        this.ActiveObjects = [];

        let spaceBackground = loadImage("Assets/Images/MainMenu/MainMenuBackground.png");
        let planet1         = loadImage("Assets/Images/LevelSelection/Planet1.png");
        let planet2         = loadImage("Assets/Images/LevelSelection/Planet2.png");
        let planet3         = loadImage("Assets/Images/LevelSelection/Planet3.png");
        let planet4         = loadImage("Assets/Images/LevelSelection/Planet4.png");
        let title           = loadImage("Assets/Images/LevelSelection/Planet-Selection.png");
        let backButton      = loadImage("Assets/Images/LevelSelection/BackButton.png");

        let obj_spaceBackground = this.CreateObject(0, 0);
        obj_spaceBackground.AddComponent(new ImageComponent(obj_spaceBackground, spaceBackground, 1920, 970));

        let obj_planet1 = this.CreateObject(100, 200);
        this.CreateButton(obj_planet1, planet1, 240, 240, .1, 200, ["load"], ["Level1"]);

        let obj_planet2 = this.CreateObject(350, 200);
        this.CreateButton(obj_planet2, planet2, 600, 600, .1, 200, ["load"], ["Level2"]);

        let obj_planet3 = this.CreateObject(930, 165);
        this.CreateButton(obj_planet3, planet3, 450, 450, .1, 200, ["load"], ["Level3"]);
        
        let obj_planet4 = this.CreateObject(1450, 400);
        this.CreateButton(obj_planet4, planet4, 300, 300, .1, 200, ["load"], ["Level4"]);

        let obj_title = this.CreateObject(400, 0);
        obj_title.AddComponent(new ImageComponent(obj_title, title, 1200, 150));

        let obj_backButton = this.CreateObject(40, 740);
        this.CreateButton(obj_backButton, backButton, 250, 250, .1, -1, ["load"], ["MainMenu"]);

        let font = loadFont("Assets/Fonts/PrimaryFont.ttf");
        let text_name_1 = this.CreateObject(50, 195);
        text_name_1.AddComponent(new TextComponent(text_name_1, "Meteor Shower", font, 32, (255, 255, 255)));
        let text_desc_1 = this.CreateObject(78, 465);
        text_desc_1.AddComponent(new TextComponent(text_desc_1, "Click on meteors before\nthey hit the planet!", font, 15, (255, 255, 255)));

        let text_name_2 = this.CreateObject(510, 312);
        text_name_2.AddComponent(new TextComponent(text_name_2, "Black Hole", font, 32, (255, 255, 255)));
        let text_desc_2 = this.CreateObject(500, 700);
        text_desc_2.AddComponent(new TextComponent(text_desc_2, "Drag the blackhole around\nthe ring to the astronauts!", font, 15, (255, 255, 255)));

        let text_name_3 = this.CreateObject(1010, 250);
        text_name_3.AddComponent(new TextComponent(text_name_3, "Space Tiles", font, 32, (255, 255, 255)));
        let text_desc_3 = this.CreateObject(1015, 550);
        text_desc_3.AddComponent(new TextComponent(text_desc_3, "Click the falling tiles!", font, 15, (255, 255, 255)));
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