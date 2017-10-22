#include <stdio.h>

int main(void) {
  puts("How many bytes does types take up?");

  printf("char: %ld\n", sizeof(char));
  printf("int: %ld\n", sizeof(int));
  printf("long int: %ld\n", sizeof(long int));
  printf("float: %ld\n", sizeof(float));
  printf("double: %ld\n", sizeof(double));
}
