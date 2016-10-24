public class Hringur{
  public static void main (String args[]){
    double r = Double.parseDouble(args[0]);
    int t = 0;
    double x = 00.1;
    while(t < 100){
      x = r*x*(1-x);
      t++;
      System.out.println(x);
    }
  }

}
