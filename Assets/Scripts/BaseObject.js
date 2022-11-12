// <reference path="../TSDef/p5.global-mode.d.ts" />
//Assets/Scripts
class BaseObject
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.components = [];
        this.destroyed = false;
    }

    AddComponent(component)
    {
        this.components.push(component);
    }
    RemoveComponent(component)
    {
        let index = this.components.indexOf(component);
        if (index == -1)
        {
            console.log("ERROR: component not found on BaseObject");
            return;
        }

        this.components.splice(index, 1);
    }
    UpdateComponents()
    {
        let events = [];
        for (let i = 0; i < this.components.length; i++)
        {
            let e = this.components[i].Update();
            if (e != null)
            {
                console.log("Added Event: " + e);
                events.push(e);
            }
        }
        return events;
    }
    GetComponent(index)
    {
        return this.components[index];
    }
    
}