class DebugComponent
{
    constructor(owner, debugString)
    {
        this.owner = owner;
        this.debugString = debugString;
    }
    Update()
    {
        console.log("Debug: " + this.debugString);
    }
}