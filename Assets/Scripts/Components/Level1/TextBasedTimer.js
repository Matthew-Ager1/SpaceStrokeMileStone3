class TextBasedTimer
{
    constructor(owner, textComponent)
    {
        this.owner = owner;
        this.textComponent = textComponent;
        this.timer = 0;
    }

    Update()
    {
        this.timer += deltaTime / 1000;
        this.textComponent.textData = String(this.timer);
        this.textComponent.textData = this.textComponent.textData.substring(0, 3);
    }

}