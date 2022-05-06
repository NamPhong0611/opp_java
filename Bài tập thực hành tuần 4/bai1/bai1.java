import java.io.FileWriter;

public class bai1{
	public static void main(String[] args){
		// a
		double[] arr = new double[]{45,30,25,30,35,40};
		try {
			FileWriter file = new FileWriter("./bai1/dayso.txt");
			for(int i = 0;i < arr.length;i++){
				file.write(arr[i] + " ");
			}
			file.close();
		} catch(Exception e) {
			System.out.println(e);
		}
	}
}