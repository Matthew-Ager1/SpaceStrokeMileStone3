class Vector3
{
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    Add(vec)
    {
        return new Vector3(vec.x + this.x, vec.y + this.y, this.z + vec.z);
    }
    Mult(val)
    {
        return new Vector3(this.x * val, this.y * val, this.z * val);
    }
    ShallowCopy()
    {
        return new Vector3(this.x, this.y, this.z);
    }
}