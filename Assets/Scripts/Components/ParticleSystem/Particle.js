// <reference path="../TSDef/p5.global-mode.d.ts" />
class Particle
{
    constructor(position, color, size, velocity, maxLifeTime, gravityStrength, scaleDown)
    {
        this.position = position;
        this.color = color;

        this.size = size;
        this.maxSize = size;

        this.velocity = velocity;

        this.maxLifeTime = maxLifeTime;
        this.lifeTime = this.maxLifeTime;

        this.gravityStrength = gravityStrength;

        this.scaleDown = scaleDown;
    }

    Draw()
    {
        fill(this.color);
        strokeWeight(0);

        rect(this.position.x + (this.size / 2), this.position.y + (this.size / 2), this.size, this.size);
    }
    AdvanceParticle()
    {   
        this.lifeTime -= deltaTime / 1000.0;

        this.velocity = this.velocity.Add(new Vector2(0, -this.gravityStrength * deltaTime / 1000));

        this.position = this.position.Add(new Vector2(this.velocity.x * deltaTime / 1000, this.velocity.y * deltaTime / 1000));

        if (this.scaleDown)
        {
            this.size = this.maxSize * (this.lifeTime / this.maxLifeTime);
        }        
    }
    IsDead()
    {
        return this.lifeTime < 0;
    }
}