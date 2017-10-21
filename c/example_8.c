#include <stdio.h>
#include <string.h>

#define MYNAME "John Doe"

int globalVar = 100;

int main() {
  char firstLetter = 'D';
  int age = 38;
  long int superBigNum = -327340019;
  float pi = 3.14159;
  double reallyBigPi = 3.14159123442323452345;
  char name[] = "David";

  printf("Age: %d\n", age);
  printf("Super big number: %ld\n", superBigNum);
  printf("Pi: %f\n", pi);
  printf("Pi: %.3f\n", pi);
  printf("Big Pi: %.15f\n", reallyBigPi);
  printf("Character: %c\n", firstLetter);
  printf("Name: %s\n", name);

  // override name (set new name)
  strcpy(name, "Jack");
  printf("Name: %s\n", name);


  int month, day, year;

  //printf("What is your birthdate?\n");
  //scanf(" %d/%d/%d", &month, &day, &year);
  //printf("Your birthdate is %d/%d/%d\n", month, day, year);


  // Float calculation
  float decimal1 = 1.2, decimal2 = 3.9;
  printf("Float calculation %f\n", decimal1 / decimal2);

  // casting the type
  int n1 = 2, n2 = 7;
  printf("%d / %d = %f\n", n1, n2, (float) n1 / n2);

  char* legalAge = age > 21 ? "true" : "false";
  printf("Legal age %s\n", legalAge);
}
