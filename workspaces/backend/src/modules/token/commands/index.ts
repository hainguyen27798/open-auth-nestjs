import { ExtractTokenCommand } from '@/modules/token/commands/extract-token.command';
import { FindTokenCommand } from '@/modules/token/commands/find-token.command';
import { GenerateTokenCommand } from '@/modules/token/commands/generate-token.command';
import { ProvideNewTokenCommand } from '@/modules/token/commands/provide-new-token.command';
import { RemoveTokenCommand } from '@/modules/token/commands/remove-token.command';
import { VerifyTokenCommand } from '@/modules/token/commands/verify-token.command';

export * from './extract-token.command';
export * from './find-token.command';
export * from './generate-token.command';
export * from './provide-new-token.command';
export * from './remove-token.command';
export * from './verify-token.command';

export const handlers = [
    ExtractTokenCommand,
    FindTokenCommand,
    GenerateTokenCommand,
    ProvideNewTokenCommand,
    RemoveTokenCommand,
    VerifyTokenCommand,
];
