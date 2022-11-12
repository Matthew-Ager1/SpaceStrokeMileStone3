class ButtonComponent
{
    constructor(owner, width, height, eventTags, events, radius = -1)
    {
        this.owner = owner;
        this.events = events;
        this.eventTags = eventTags;
        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    Update()
    {
        if (this.radius == -1)
        {
            let maxX = this.owner.x + this.width;
            let maxY = this.owner.y + this.height;
            let minX = this.owner.x;
            let minY = this.owner.y;
            if (mouseIsPressed && mouseX < maxX && mouseX > minX && mouseY < maxY && mouseY > minY)
            {
                let retArr = [];
                for (let i = 0; i < this.eventTags.length; i++)
                {
                    retArr.push(this.eventTags[i]);
                    retArr.push(this.PreprocessEvent(this.events[i]));
                }
                return retArr;
            }
        }
        else
        {
            let relX = this.owner.x + (this.width / 2.0) - mouseX;
            let relY = this.owner.y + (this.height / 2.0) - mouseY;
            if (mouseIsPressed && sqrt((relX * relX) + (relY * relY)) < this.radius)
            {              
                let retArr = [];
                for (let i = 0; i < this.eventTags.length; i++)
                {
                    retArr.push(this.eventTags[i]);
                    retArr.push(this.PreprocessEvent(this.events[i]));
                }

                return retArr;
            }
        }
    }

    PreprocessEvent(event)
    {
        if (event == "meteorExplosion")
        {
            return this.GetNewMeteorDeathParticleSystem(this.owner.x + this.radius, this.owner.y + this.radius);
        }

        return event;
    }


    GetNewMeteorDeathParticleSystem(x, y)
    {
        let meteorParticles = new BaseObject(x, y);
        meteorParticles.AddComponent(new SelfDestruct(meteorParticles, 2));
        meteorParticles.AddComponent
        (
            new ParticleSystem
            (
            meteorParticles,
            new Vector2(0, 0),
            25, 
            100000,
            25,
            [[255, 75, 0], [255, 0, 0]],
            [8, 14],
            [25, 35], 
            [.5, 1],
            0,
            true
            )                    
        )
        return meteorParticles;
    }

    IsPressed()
    {
        if (this.radius == -1)
        {
            let maxX = this.owner.x + this.width;
            let maxY = this.owner.y + this.height;
            let minX = this.owner.x;
            let minY = this.owner.y;
            if (mouseIsPressed && mouseX < maxX && mouseX > minX && mouseY < maxY && mouseY > minY)
            {
                return true;
            }
        }
        else
        {
            let relX = this.owner.x + (this.width / 2.0) - mouseX;
            let relY = this.owner.y + (this.height / 2.0) - mouseY;
            if (mouseIsPressed && sqrt((relX * relX) + (relY * relY)) < this.radius)
            {              
                return false;
            }
        }
    }
}