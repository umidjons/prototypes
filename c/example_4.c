#include <stdio.h>

int main(void) {
  int grade;

  puts("Enter your grade:");
  scanf("%d", &grade);

  puts(grade >= 60 ? "Passed." : "Failed.");
}
