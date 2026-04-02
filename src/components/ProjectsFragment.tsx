import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowRight,
  ExternalLink,
  Info,
  SquareArrowOutUpRight,
} from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects, ProjectFragmentProps } from '@/lib/project';
import { PhotoCarousel } from '@/components/PhotoCarousel';

const ProjectCard: React.FC<
  ProjectFragmentProps & { onMoreInfo: () => void }
> = ({ title, images, description, link, stacks, onMoreInfo }) => {
  const maxVisibleStacks = 4;
  const visibleStacks = stacks?.slice(0, maxVisibleStacks) || [];
  const remainingCount = stacks ? stacks.length - maxVisibleStacks : 0;

  // Truncate description to approximately 3 lines (about 150 characters)
  const truncatedDescription =
    description.length > 150
      ? description.substring(0, 150).trim() + '...'
      : description;

  return (
    <Card className='flex flex-col h-full gap-0'>
      <CardContent>
        <AspectRatio ratio={16 / 9} className='mb-4'>
          <Image
            className='h-full w-full object-cover rounded-md'
            src={images[0]}
            alt={title}
            width={1920}
            height={1080}
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>

        <CardTitle className='text-2xl font-extralight mb-3'>{title}</CardTitle>

        <p className='text-sm text-muted-foreground mb-4 line-clamp-3'>
          {truncatedDescription}
        </p>

        {stacks && stacks.length > 0 && (
          <div className='flex items-center flex-wrap gap-2 mb-4 not-dark:invert-100 dark:invert-0'>
            {visibleStacks.map((stack, index) => (
              <Image
                key={`${stack}-${index}`}
                className='w-5 h-5'
                src={stack}
                alt={`Stack ${index}`}
                width={20}
                height={20}
              />
            ))}
            {remainingCount > 0 && (
              <Badge variant='secondary' className='text-xs'>
                +{remainingCount}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className='flex justify-center items-center gap-2'>
        <Button className='w-1/2' variant='secondary' onClick={onMoreInfo}>
          <Info />
          More info
        </Button>
        {link && (
          <Button
            className='w-1/2 cursor-pointer'
            variant='default'
            onClick={() => window.open(link)}
          >
            <SquareArrowOutUpRight />
            View Project
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const ProjectsFragment: React.FC<{ limitDisplay?: boolean }> = ({
  limitDisplay = false,
}) => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectFragmentProps | null>(null);

  // If limitDisplay is true, only show the first 3 projects
  const displayedProjects = limitDisplay ? projects.slice(0, 3) : projects;

  return (
    <>
      <div className='container mx-auto px-0'>
        <div className='flex w-full flex-col items-center justify-start h-auto'>
          <Card className='w-full border-t-0 border-x-0 border-b-0 rounded-none shadow-none'>
            <CardHeader>
              <CardTitle className='text-4xl md:text-6xl font-extralight'>
                Projects
              </CardTitle>
              <CardDescription className='text-sm md:text-base'>
                Here are some of the projects I&apos;ve worked on.
              </CardDescription>
            </CardHeader>
            <div className='container border-t-0 border-x-0 border-b rounded-none w-full border-dashed'></div>
            <CardContent className='pt-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {displayedProjects.map((project) => (
                  <ProjectCard
                    key={project.title}
                    {...project}
                    onMoreInfo={() => setSelectedProject(project)}
                  />
                ))}
              </div>

              {limitDisplay && (
                <div className='flex justify-center pt-8'>
                  <Link href='/projects'>
                    <Button size='lg' variant='outline' className='group'>
                      See More
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className='w-full md:max-w-3xl h-[80vh] flex flex-col p-0 gap-0'>
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className='text-3xl font-extralight'>
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <ScrollArea className='flex-1 min-h-0'>
                <div className='px-6 py-6 space-y-4'>
                  {selectedProject.images.length > 1 ? (
                    <PhotoCarousel
                      images={selectedProject.images}
                      itemsToShow={1}
                      navigation='below'
                      showButtons={true}
                      showDots={true}
                      autoplayDelay={3000}
                      containerClassName='aspect-video'
                      btnVariant='outline'
                      objectFit='contain'
                    />
                  ) : (
                    <div className='relative aspect-video w-full'>
                      <Image
                        src={selectedProject.images[0]}
                        alt={`Image 1`}
                        fill
                        className='rounded-md object-contain'
                      />
                    </div>
                  )}

                  {selectedProject.stacks &&
                    selectedProject.stacks.length > 0 && (
                      <div>
                        <div className='text-sm font-medium mb-2 text-foreground'>
                          Skills Gained & Used
                        </div>
                        <div className='flex items-center flex-wrap gap-2 not-dark:invert-100 dark:invert-0'>
                          {selectedProject.stacks.map((stack, index) => (
                            <Image
                              key={`${stack}-${index}`}
                              className='w-6 h-6'
                              src={stack}
                              alt={`Stack ${index}`}
                              width={24}
                              height={24}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                  <div className='text-base leading-relaxed text-foreground'>
                    {selectedProject.description}
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter>
                {selectedProject.github_link && (
                  <Button
                    variant='secondary'
                    size='lg'
                    className='w-full sm:w-auto cursor-pointer'
                    onClick={() => window.open(selectedProject.github_link)}
                  >
                    View Repository
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                )}
                {selectedProject.link && (
                  <Button
                    size='lg'
                    className='w-full sm:w-auto cursor-pointer'
                    onClick={() => window.open(selectedProject.link)}
                  >
                    View Project
                    <ExternalLink className='ml-2 h-4 w-4 ' />
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsFragment;
