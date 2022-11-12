class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Add(vec)
    {
        return new Vector2(vec.x + this.x, vec.y + this.y);
    }
    Mult(val)
    {
        return new Vector2(this.x * val, this.y * val);
    }
    Normalize()
    {
        let mag = sqrt(pow(this.x, 2) + pow(this.y, 2));
        //this.x /= mag;
        //this.y /= mag;
        return new Vector2(this.x / mag, this.y / mag);
    }
    ShallowCopy()
    {
        return new Vector2(this.x, this.y);
    }
    Random()
    {
        return this.Random(this.x, this.y);
    }
}