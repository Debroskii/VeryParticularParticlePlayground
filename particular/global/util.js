class Util {
    static out_of_bounds(position) {
        if(position.x > DIMENSIONS[0] || position.y > DIMENSIONS[1]) return true;
        else if(position.x < 0 || position.y < 0) return true;
        else return false;
    }
}