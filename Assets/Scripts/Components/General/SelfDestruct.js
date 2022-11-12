class SelfDestruct
{
    constructor(owner, timer)
    {
        this.owner = owner;
        this.timer = timer;
    }
    Update()
    {
        this.timer -= deltaTime / 1000;
        if (this.timer < 0)
        {
            return ["destroy", this.owner]
        }
    }
}