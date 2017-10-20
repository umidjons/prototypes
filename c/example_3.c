#include <stdio.h>

int main(void) {
  int num1, num2;

  printf("Enter two numbers separated by space:\n");
  scanf("%d %d", &num1, &num2);

  if (num1 == num2) {
    printf("Numbers are equal.\n");
  }

  if (num1 != num2) {
    printf("Numbers are not equal.\n");
  }

  if (num1 > num2) {
    printf("%d is greater than %d.\n", num1, num2);
  }

  if (num1 < num2) {
    printf("%d is less than %d.\n", num1, num2);
  }

  if (num1 >= num2) {
    printf("%d is greater than or equal to %d.\n", num1, num2);
  }

  if (num1 <= num2) {
    printf("%d is less than or equal to %d.\n", num1, num2);
  }

}
