class ImageComponent
{
    constructor(owner, _image, width, height, expandAmountOnHover = -1, radius = -1)
    {
        this.owner = owner;
        this.image = _image;
        this.width = width;
        this.height = height;

        this.expandAmountOnHover = expandAmountOnHover;
        this.radius = radius;
        this.expansionTime = 100;
        this.timer = 0;
        this.origWidth = width;
        this.origHeight = height;
    }

    Update()
    {
        if (this.expandAmountOnHover != -1)
        {
            if (this.IsHovering())
            {
                this.timer += deltaTime / this.expansionTime;
                if (this.timer > 1)
                {
                    this.timer = 1;
                }
            }
            else
            {
                this.timer -= deltaTime / this.expansionTime;
                if (this.timer < 0)
                {
                    this.timer = 0;
                }
            }
            this.SetScale(1.0 + (this.timer * this.expandAmountOnHover));
        }

        image(this.image, this.owner.x, this.owner.y, this.width, this.height);
    }

    IsHovering()
    {
        if (this.radius == -1)
        {
            let maxX = this.owner.x + this.width;
            let maxY = this.owner.y + this.height;
            let minX = this.owner.x;
            let minY = this.owner.y;
            if (mouseX < maxX && mouseX > minX && mouseY < maxY && mouseY > minY)
            {
                return true;
            }
            return false;
        }
        else
        {
            let relX = this.owner.x + (this.width / 2.0) - mouseX;
            let relY = this.owner.y + (this.height / 2.0) - mouseY;
            if (sqrt((relX * relX) + (relY * relY)) < this.radius)
            {              
                return true;
            }
            return false;
        }
    }

    SetScale(mult) //mult > 1
    {
        let tWidth = this.origWidth * mult;
        let tHeight = this.origHeight * mult;

        let extraWidth = tWidth - this.origWidth;
        let extraHeight = tHeight - this.origHeight;

        let tX = this.owner.x - (extraWidth / 2.0);
        let tY = this.owner.y - (extraHeight / 2.0);

        this.owner.x = tX;
        this.owner.y = tY;
        this.width = tWidth;
        this.height = tHeight;
    }
}