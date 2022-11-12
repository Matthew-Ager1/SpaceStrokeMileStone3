class PhysicsBody
{
    constructor(owner, dragConstant = 0)
    {
        this.owner = owner;
        this.dragConstant = dragConstant; 
        this.velocity = new Vector2(0, 0);
    }

    Update()
    {
        this.owner.x += this.velocity.x * deltaTime / 3000;
        this.owner.y += this.velocity.y * deltaTime / 3000;
        if (this.dragConstant != 0)
        {
            this.ApplyDrag();
        }
    }

    AddForce(x, y, force)
    {
        force *= deltaTime / 1000;
        this.velocity = this.velocity.Add(new Vector2(x * force, y * force));
        //this.velocity = [this.velocity[0] + (x * force), this.velocity[1] + (y * force)];
    }
    ApplyDrag()
    {
        let tempVec = this.velocity.ShallowCopy();
        tempVec = tempVec.Mult(-this.dragConstant);
        this.velocity = this.velocity.Add(tempVec);
        //this.velocity = [this.velocity[0] - (this.velocity[0] * this.dragConstant), this.velocity[1] - (this.velocity[1] * this.dragConstant)];
    }
    SetVelocity(vel)
    {
        this.velocity = vel;
    }
    
}

