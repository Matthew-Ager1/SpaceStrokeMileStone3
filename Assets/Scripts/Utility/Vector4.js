class Vector4
{
    constructor(x, y, z, w)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    Add(vec)
    {
        return new Vector3(vec.x + this.x, vec.y + this.y, this.z + vec.z, this.w + vec.w);
    }
    Mult(val)
    {
        return new Vector3(this.x * val, this.y * val, this.z * val, this.w * val);
    }
    ShallowCopy()
    {
        return new Vector3(this.x, this.y, this.z, this.w);
    }
}