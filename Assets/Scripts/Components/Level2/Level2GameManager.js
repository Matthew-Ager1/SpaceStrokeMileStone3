class Level2GameManager
{
    constructor(owner, playerObj, playerSize, goalImage)
    {
        this.owner = owner;
        this.playerObj = playerObj;
        this.playerSize = 50;

        this.center = new Vector2(980, 470);
        this.goalSpawnRaidus = 800;
        this.radiusBounds = new Vector2(380, 470);
        this.holdingPlayer = false;
        this.points = 0;
        this.pointsScaleIncrement = 5;

        this.goal = new Vector2(0, 0);
        this.goalImage = goalImage;

        this.goalPosition = new Vector2(0, 0);
        this.goalScale = 75;

        this.init = false;

        this.gameEnded = false;

        this.playerObj.GetComponent(0).radius = this.playerSize;
        this.playerObj.GetComponent(0).width  = this.playerSize;
        this.playerObj.GetComponent(0).height = this.playerSize;
    }

    Update()
    {

        if (this.gameEnded)
        {
            textSize(50);
            fill([255, 255, 255]);
            text("You Hit The Edge\nFinal Score : " + this.points, 640, 430);
            return;
        }
        else
        {
            textSize(50);
            fill([255, 255, 255]);
            text("Score : " + this.points, 710, 430);
        }
        
        if (!this.init && !SceneManagementUtility.sceneLoading)
        {
            this.init = true;
            this.Init();
        }

        let retArgs = [];

        this.holdingPlayer = this.IsHoldingPlayer();
        
        this.UpdatePlayerPosition();
        if (this.PlayerHitWall())
        {
            this.gameEnded = true;
        }

        if (this.CheckPlayerAtGoal())
        {
            this.IncrementScore();
            this.goalPosition = this.CreateNewGoal();
        }
        this.DrawGoal();

    }

    UpdatePlayerPosition()
    {
        if (this.holdingPlayer)
        {
            this.playerObj.x = mouseX - this.playerSize / 2;
            this.playerObj.y = mouseY - this.playerSize / 2;
        }
    }
    IncrementScore()
    {
        this.points++;
        this.playerSize = this.playerSize + this.pointsScaleIncrement;
        this.playerObj.GetComponent(0).radius = this.playerSize;
        this.playerObj.GetComponent(0).width  = this.playerSize;
        this.playerObj.GetComponent(0).height = this.playerSize;
    }
    CheckPlayerAtGoal()
    {
        return this.DistanceToPlayer(new Vector2(this.goalPosition.x + this.goalScale / 2.0, this.goalPosition.y + this.goalScale / 2.0)) < this.playerSize / 2.0;
    }
    CreateNewGoal()
    {
        let p = new Vector2(random(-1.0, 1.0), random(-1.0, 1.0));  
        p = p.Normalize();
        p = p.Mult(this.goalSpawnRaidus / 2);
        p = p.Add(this.center);
        p = p.Add(new Vector2(-this.goalScale / 2.0, -this.goalScale / 2.0));
        return p;
    }
    PlayerHitWall()
    {
        return this.DistanceToPlayer(this.center) < this.radiusBounds.x || this.DistanceToPlayer(this.center) > this.radiusBounds.y;
    }
    IsHoldingPlayer()
    {
        if (this.holdingPlayer)
        {
            return mouseIsPressed;
        }
        else
        {
            return mouseIsPressed && this.DistanceToPlayer(new Vector2(mouseX, mouseY)) < this.playerSize / 2;
        }
    }
    DistanceToPlayer(point)
    {
        let xDiff = point.x - (this.playerObj.x + this.playerSize / 2);
        let yDiff = point.y - (this.playerObj.y + this.playerSize / 2);
        return sqrt(pow(xDiff, 2) + pow(yDiff, 2));
    }
    Init()
    {
        this.goalPosition = this.CreateNewGoal();
    }
    DrawGoal()
    {
        image(this.goalImage, this.goalPosition.x, this.goalPosition.y, this.goalScale, this.goalScale);
    }
    
}