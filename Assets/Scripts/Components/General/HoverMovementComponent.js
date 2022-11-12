class HoverMovement
{
    constructor(owner, upDown, min, max, rate)
    {
        this.owner = owner;
        this.upDown = upDown;
        this.min = min;
        this.max = max;
        this.rate = rate;

        this.timer = 0;
    }

    Update()
    {
        this.timer += deltaTime * this.rate;
        let val = (sin(this.timer) + 1.0) / 2.0;
        let pos = lerp(this.min, this.max, val);

        if (this.upDown)
        {      
            this.owner.y = pos;
        }
        else
        {
            this.owner.x = pos;
        }
    }
}