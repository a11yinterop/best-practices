# makefile for Best Practices
#
# define the source files
sources=choice-interaction.md text-interaction.md inline-choice-interaction.md
# targets
html_targets=$(sources:.md=.html)

# implicit rules
%.html: %.md
	pandoc -s -w html5 $< -o $@

# targets
.PHONY: clean

all: $(html_targets)

clean: 
	rm -f $(html_targets)
