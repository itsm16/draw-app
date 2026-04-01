const writeText = ({ctx, text, x = 600, y = 100}: {ctx: CanvasRenderingContext2D, text: string, x?: number, y?: number}) =>{
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px "Architects Daughter"';
    ctx.fillStyle = 'white'; 
    ctx.fillText(text, x, y);
}


export {
    writeText
}