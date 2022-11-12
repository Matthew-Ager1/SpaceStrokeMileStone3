// <reference path="../TSDef/p5.global-mode.d.ts" />
//Assets/Scripts/Components/ParticleSystem
class ParticleSystem
{
    constructor(owner, offset, spawnRadius, spawnRate, burstSpawnCount, colorRange, sizeRange, velocityRange, lifeTimeRange, gravityStrength, scaleDown)
    {
        this.owner = owner;
        this.offset = offset;
        this.spawnRate = spawnRate;
        this.spawnRadius = spawnRadius;
        this.spawnTimer = this.spawnRate;
        this.burstSpawnCount = burstSpawnCount;
        this.colorRange = colorRange;
        this.sizeRange = sizeRange;
        this.velocityRange = velocityRange;
        this.lifeTimeRange = lifeTimeRange;
        this.gravityStrength = gravityStrength;
        this.scaleDown = scaleDown;
        
        this.activeParticles = [];

        this.enabled = true;

        this.Start();
    }

    Start()
    {
        if (this.burstSpawnCount != -1)
        {
            for (let i = 0; i < this.burstSpawnCount; i++)
            {
                this.CreateParticle();
            }
        }
    }

    Update()
    {       
        if (this.enabled)
        {
            this.UpdateParticles();

            this.spawnTimer -= (deltaTime / 1000);
            if (this.spawnTimer <= 0)
            {
                this.spawnTimer = this.spawnRate;
                this.CreateParticle();
            }
        }       
    }

    UpdateParticles()
    {
        for (let i = 0; i < this.activeParticles.length; i++)
        {
            this.activeParticles[i].AdvanceParticle();
            
            if (this.activeParticles[i].IsDead())
            {
                this.activeParticles.splice(i, 1);
                i--;
                continue;
            }

            this.activeParticles[i].Draw();
        }
    }

    CreateParticle()
    {   
        this.activeParticles.push
        (
            new Particle
            (
                new Vector2(this.owner.x + this.offset.x + random(-this.spawnRadius, this.spawnRadius), this.owner.y + this.offset.y + random(-this.spawnRadius, this.spawnRadius)), 
                this.ColorLerp(this.colorRange[0], this.colorRange[1], random(0.0, 1.0)),
                random(this.sizeRange[0], this.sizeRange[1]), 
                this.GetRandomDirVector(random(this.velocityRange[0], this.velocityRange[1])), 
                random(this.lifeTimeRange[0], this.lifeTimeRange[1]),
                this.gravityStrength,
                this.scaleDown
            )
        );
    }

    GetRandomDirVector(magnitude)
    {       
        let ret = new Vector2(random(-1.0, 1.0), random(-1.0, 1.0));
        ret = ret.Normalize();
        ret = ret.Mult(magnitude);
        return ret;
    }

    ColorLerp(x, y, t)
    {
        let r = this.Lerp(x[0], y[0], t);
        let g = this.Lerp(x[1], y[1], t);
        let b = this.Lerp(x[2], y[2], t);
        return [r, g, b];
    }
    Lerp(x, y, t)
    {
        return x + ((y - x) * t);
    }
}