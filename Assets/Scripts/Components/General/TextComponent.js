class TextComponent
{
    constructor(owner, textData, font, size, col)
    {
        this.owner = owner;
        this.textData = textData;
        this.font = font;
        this.size = size;
        this.col = col;
    }

    Update()
    {
        textFont(this.font);
        textSize(this.size);
        fill(this.col);
        text(this.textData, this.owner.x, this.owner.y);
    }
}