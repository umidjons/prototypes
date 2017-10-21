#include <stdio.h>

int main(void) {
  unsigned int counter = 1;
  int grade;
  int total = 0;
  int average;

  while (counter <= 10) {
    puts("Enter grade:");
    scanf("%d", &grade);

    total += grade;
    ++counter;
  }

  average = total / 10;

  printf("Class average is %d\n", average);
}
