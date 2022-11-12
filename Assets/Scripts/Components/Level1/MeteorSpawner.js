class MeteorSpawner
{
    constructor(owner, meteorData, velocityRange, spawnRateRange, timeToMax)
    {
        this.owner = owner;
        this.meteorData = meteorData; //[0] = image
        this.velocityRange = velocityRange;
        this.spawnRateRange = spawnRateRange; //[0]:max, [1]min
        this.timeToMax = timeToMax;
        this.spawnTimer = 2;
        this.totalTimer = 0;

        this.activeMeteors = [];
        this.centerPos = [870, 480];
    }

    Update()
    {
        let result = this.ManageActiveMeteors();
        if (result != null)
        {
            return result;
        }

        this.totalTimer += (deltaTime / 1000.0);
        this.totalTimer = this.totalTimer > this.timeToMax ? this.timeToMax : this.totalTimer;
        this.spawnTimer -= (deltaTime / 1000.0);
        if (this.spawnTimer < 0)
        {
            this.spawnTimer = lerp(this.spawnRateRange[0], this.spawnRateRange[1], this.totalTimer / this.timeToMax);
            return this.CreateMeteor();
        }
    }

    CreateMeteor()
    {
        let spawnPos = new Vector2(random(-1.0, 1.0), random(-1.0, 1.0));
        spawnPos = spawnPos.Normalize();
        spawnPos = spawnPos.Mult(600);
        spawnPos = spawnPos.Add(new Vector2(830, 480));
        console.log(spawnPos.x, spawnPos.y);
        
        let meteor = new BaseObject(spawnPos.x, spawnPos.y);

        let radius = random(90, 120);
        meteor.AddComponent(new ImageComponent(meteor, this.meteorData[0], radius, radius));
        meteor.AddComponent(new ButtonComponent(meteor, radius, radius, ["destroy", "create"],  [meteor, "meteorExplosion"], radius / 2.0));
        meteor.AddComponent(new PhysicsBody(meteor, .003));

        let randVel = new Vector2(random(-1, 1), random(-1, 1));
        randVel.Normalize();
        randVel.Mult(random(this.velocityRange[0], this.velocityRange[1]));
        meteor.GetComponent(2).SetVelocity(randVel);       

        this.activeMeteors.push(meteor);
        
        return ["create", meteor];
    }

    lerp(a, b, v)
    {
        return (1 - v) * a + v * b;
    }

    ManageActiveMeteors()
    {
        for (let i = 0; i < this.activeMeteors.length; i++)
        {
            let meteorPos = [this.activeMeteors[i].x, this.activeMeteors[i].y];
            let vecToCenter = [this.centerPos[0] - meteorPos[0], this.centerPos[1] - meteorPos[1]];
            let magnitude = sqrt(pow(vecToCenter[0], 2) + pow(vecToCenter[1], 2));
            let forceMag = 100000 / (magnitude * magnitude);
            this.activeMeteors[i].GetComponent(2).AddForce(vecToCenter[0], vecToCenter[1], forceMag);

            let xDiff = meteorPos[0] - this.centerPos[0];
            let yDiff = meteorPos[1] - this.centerPos[1];
            xDiff = pow(xDiff, 2);
            yDiff = pow(yDiff, 2);
            let dist = sqrt(xDiff + yDiff);
            if (dist < 150)
            {
                return ["reset", "Level1"];
            }
        }
        return null;
    }

    
}